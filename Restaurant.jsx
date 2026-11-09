import PropTypes from 'prop-types';
function Rating({ value, max = 5 }) {
  const full = Math.round(value);
  return (
    <span aria-label={`Рейтинг ${value} з ${max}`}>
      {'★'.repeat(full)}{'☆'.repeat(max - full)} ({value.toFixed(1)})
    </span>
  );
}
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
};
function Restaurant({ name, address, rating, cuisine, image }) {
  return (
    <article className="card row">
      <img src={image} alt={`Будівля ресторану ${name}`} width="280" />
      <div style={{ flex: 1, minWidth: 240 }}>
        <h1>{name}</h1>
        <dl>
          <dt>Адреса</dt><dd>{address}</dd>
          <dt>Рейтинг</dt><dd><Rating value={rating} /></dd>
          <dt>Тип кухні</dt><dd>{cuisine}</dd>
        </dl>
      </div>
    </article>
  );
}
Restaurant.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  cuisine: PropTypes.string.isRequired,
  image: PropTypes.string,
};
Restaurant.defaultProps = {
  image: 'https://placehold.co/280x200?text=Ресторан',
};
export default Restaurant;
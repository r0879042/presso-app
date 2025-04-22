export default function ProductCard({ name, image }) {
    return (
      <div className="card text-center">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h6>{name}</h6>
        </div>
      </div>
    );
  }
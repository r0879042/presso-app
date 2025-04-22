export default function Connect() {
    return (
      <div className="container py-5 text-center">
        <p>Enter session code to continue</p>
        <input type="text" className="form-control text-center w-50 mx-auto" maxLength="6" />
        <button className="btn btn-success mt-4">Continue</button>
      </div>
    );
  }
  
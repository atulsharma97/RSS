import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

function IndividualIntervalsExample() {
  return (
    <Carousel>
      <Carousel.Item interval={500}>
        <div
          className="signup"
          style={{
            backgroundImage: `url("/assets/mandir1.jpg")`,
            height: "80vh",
          }}
        ></div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={700}>
        <div
          className="signup"
          style={{
            backgroundImage: `url("/assets/mandir2.jpg")`,
            height: "80vh",
          }}
        ></div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="signup"
          style={{
            backgroundImage: `url("/assets/mandir3.jpg")`,
            height: "80vh",
          }}
        ></div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;

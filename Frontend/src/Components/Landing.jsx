import Header from "./Header";
import Midd from "./midd";
import Footer from "./Footer";
import Features from "./features";
import ShowCase from "./ShowCase";

function Landing() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Midd />
      <Features/>
      <ShowCase />
      <Footer />
    </div>
  );
}
export default Landing;
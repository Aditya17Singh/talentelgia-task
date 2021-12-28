import { connect } from "react-redux";
import Signin from "./Signin";

function Home(props) {
  // console.log(props, "from home");
  let user = props.user;
  return (
    <div className="flex flex-col justify-center items-center m-10 border-2 p-10">
      {user && <div>welcome</div>}
      {!user && (
        <div>
          <p>Please Register/Login to Explore all The Features!</p>
        </div>
      )}
      {props.isOpen && <Signin />}
    </div>
  );
}
function mapStateToProps(state) {
  return { isOpen: state.isOpen };
}
export default connect(mapStateToProps)(Home);

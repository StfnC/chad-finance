import { connect } from "react-redux";
import { Redirect } from "react-router";

const Home = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    // TODO: Extraire le first_name de l'utilisateur et créer un message perso
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);

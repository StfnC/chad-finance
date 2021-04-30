import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { verify } from "../../actions/auth";

const Activate = ({ match, verify }) => {
    const history = useHistory();

    const activate = () => {
        const uid = match.params.uid;
        const token = match.params.token;

        history.push("/login"); // Permet de rediriger l'utilisateur à /login

        verify(uid, token);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={activate}>
                Activez votre compte
            </Button>
        </div>
    );
};

export default connect(null, { verify })(Activate);

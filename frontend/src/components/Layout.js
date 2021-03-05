import '../App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, loadUser } from '../actions/auth';

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
    }, []);

    return (
        <div className="center">
            {props.children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);

import '../App.css';

export default function Layout(props) {
    return (
        <div className="center">
            {props.children}
        </div>
    );
}
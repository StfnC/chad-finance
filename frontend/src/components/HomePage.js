export default function HomePage(props) {
    return (
        <div>
            <h1>This is the homepage</h1>
            <p>Hello, {props.name}</p>
        </div>
    );
}

type Props = {
    name: string
}

export default function ButtonPrimary({ name } : Props){
    return (
        <>
            <div className="btn btn-blue">
                {name}
            </div>
        </>
    );
}
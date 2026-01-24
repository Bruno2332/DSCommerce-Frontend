



type Props = {
    name: string
}

export default function ButtonInverse({ name } : Props){


    return (
        <>
            <div className="btn btn-white">
                {name}
            </div>
        </>
    );
}
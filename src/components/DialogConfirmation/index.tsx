import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
    id: number;
    message: string;
    onDialogAnswer: Function;
}

export default function DialogConfirmation({ id, message, onDialogAnswer }: Props) {

    return (
        <div className="dialog-background" onClick={() => onDialogAnswer(false, id)}>
            <div className="dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dialog-btn-container">
                    <div onClick={() => onDialogAnswer(true, id)}>
                        <ButtonPrimary name='Sim' />
                    </div>
                    <div onClick={() => onDialogAnswer(false, id)}>
                        <ButtonInverse name="Não" />
                    </div>
                </div>
            </div>
        </div>
    );
}
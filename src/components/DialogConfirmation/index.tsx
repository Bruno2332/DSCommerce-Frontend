import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
    message: string;
    onDialogAnswer: Function;
}

export default function DialogConfirmation({ message, onDialogAnswer }: Props) {

    return (
        <div className="dialog-background" onClick={() => onDialogAnswer(false)}>
            <div className="dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dialog-btn-container">
                    <div onClick={() => onDialogAnswer(true)}>
                        <ButtonPrimary name='Sim' />
                    </div>
                    <div onClick={() => onDialogAnswer(false)}>
                        <ButtonInverse name="Não" />
                    </div>
                </div>
            </div>
        </div>
    );
}
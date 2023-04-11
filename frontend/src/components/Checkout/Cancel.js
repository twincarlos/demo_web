import { useParams } from "react-router-dom";

function Cancel() {
    const { stripeSessionId } = useParams();

    return (
        <div>
            Cancel: { stripeSessionId }
        </div>
    );
};

export default Cancel;
import { useParams } from "react-router-dom";

function Success() {
    const { stripeSessionId } = useParams();
    return (
        <div>
            Success: { stripeSessionId }
        </div>
    );
};

export default Success;
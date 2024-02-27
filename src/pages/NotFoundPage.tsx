import useUserQuery from "@api/user/queries/useUserQuery";
import Button from "@components/common/Buttons/Button";
import Routes from "@router/Routes";
import { useNavigate } from "react-router-dom";

// TODO: Design
export default function NotFoundPage() {
  const navigate = useNavigate();

  const { data: user } = useUserQuery();

  return (
    <div>
      <h1>Oops! We couldn't find the page you were looking for!</h1>
      <Button
        variant="primary"
        size="h44"
        onClick={() => navigate(user ? Routes.DASHBOARD : Routes.LANDING)}>
        Return to Main Page
      </Button>
    </div>
  );
}

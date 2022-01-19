import { UserInfo } from "@core/assets/interfaces/interfaces";
import { dateBrazil } from "@core/assets/utils/date";
import Error from "@core/components/Error";
import Loading from "@core/components/Loading";
import { RootState } from "@store/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Img, Button } from "./styles";
import { myAccount } from "@core/assets/services/User/MyAccount";

const UserDetails = () => {
  const { token } = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    bets: [],
    created_at: "",
    email: "",
    id: 0,
    is_admin: 0,
    name: "",
    picture: "",
    token: "",
    token_created_at: "",
    updated_at: "",
  });

  const fetchData = useCallback(async () => {
    const response = await myAccount(token);
    if (!!response) {
      setUserInfo(response);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="text-center pt-5">
      {userInfo.picture && <img src={userInfo.picture} alt="user" />}
      {!userInfo.picture && (
        <Img
          src="https://altinbasedutrstorage.blob.core.windows.net/altinbasedutrblob/2c6f0e8c_member.jpg"
          alt="user"
        />
      )}
      <h1 className="mt-5">{userInfo.name}</h1>
      <p>{userInfo.email}</p>
      <p>Quantidade de apostas realizadas: {userInfo.bets.length}</p>
      <p>Data de cadastro: {dateBrazil(new Date(userInfo.created_at))}</p>
      <Link to="/user/edit">
        <Button className="btn btn-primary">Editar</Button>
      </Link>
    </div>
  );
};

export default UserDetails;

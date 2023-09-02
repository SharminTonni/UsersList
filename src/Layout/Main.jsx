import React from "react";
import { Spinner } from "react-bootstrap";
import { Outlet, useNavigation } from "react-router-dom";

const Main = () => {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state == "loading" && (
        <div className="mx-auto">
          {" "}
          <Spinner animation="border" variant="danger" />
        </div>
      )}

      <Outlet></Outlet>
    </div>
  );
};

export default Main;

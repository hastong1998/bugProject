import React from "react";

export default function Detail(props) {
  return (
    <div>
      Giá trị tham số :{props.match.params.id}
      <br></br>
      Path name hiện tại:{props.match.path}
    </div>
  );
}

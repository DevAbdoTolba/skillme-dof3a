import React from "react";
import "./styles/DribbleButton.css";
interface Props {
  dribble: boolean;
}
export default function DribbleButton({ dribble }: Props) {
  console.log(dribble);
  console.log("heart " + (dribble && "heart heart-active"));

  return (
    <>
      <span
        className={"heart " + (dribble && "heart heart-active")}
        style={{
          backgroundImage: "url(img.png)",
        }}
      />
    </>
  );
}

import { Link } from "@chakra-ui/react"
import React from "react"

import star from "@/public/star.png"
const Path = (props: {
  userName: string
  repoName: string
  starNumber: number
}) => {
  return (
    <div className="flex flex-row h-[50px] w-full gap-3 justify-start items-center">
      <Link href={`https://github.com/${props.userName}`}>
        {props.userName}
      </Link>
      {`>`}
      <Link href={`https://github.com/${props.userName}/${props.repoName}`}>
        {props.repoName}
      </Link>
      <img
        src={star}
        alt=""
        className="flex w-[20px] h-[20px]"
        style={{ marginLeft: "20px" }}
      />{" "}
      {props.starNumber} stars
    </div>
  )
}

export default Path

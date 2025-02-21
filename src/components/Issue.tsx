import { IssueType } from "@/features/issues/issuesSlice"
import { timeSince } from "@/utils/utils"
import { Draggable } from "@hello-pangea/dnd"
import React from "react"

const Issue = (props: { issue: IssueType; index: number }) => {
  return (
    <Draggable draggableId={String(props.issue.id)} index={props.index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* <issueCard key={issue.id} issue={issue} index={index} /> */}
          <div
            className="bg-white"
            style={{
              border: "1px solid black",
              padding: "5px",
              borderRadius: "10px",
              gap: "10px",
            }}
            key={props.issue.id}
          >
            <h1 className="truncate">{props.issue.title}</h1>
            <p className="truncate">
              #{props.issue.number} opened{" "}
              {timeSince(props.issue.created_at)}{" "}
            </p>
            <p className="truncate">
              {props.issue.author_association} | Comments:{" "}
              {props.issue.comments}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Issue

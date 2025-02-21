import { IssueType } from "@/features/issues/issuesSlice"
import { Badge, Heading, Stack } from "@chakra-ui/react"
import { Droppable } from "@hello-pangea/dnd"
import React from "react"
import Issue from "./Issue"
import { Box } from "lucide-react"
export type ColumnName = "ToDo" | "In Progress" | "Done"
const ColumnColorScheme: Record<ColumnName, string> = {
  ToDo: "gray",
  "In Progress": "blue",
  Done: "green",
}
const Column = (props: { name: ColumnName; issues?: IssueType[] }) => {
  return (
    <div className="flex flex-col justify-start items-center h-full w-full">
      <Heading fontSize="2xl" p={5} letterSpacing="wide">
        <Badge
          px={6}
          py={3}
          rounded="lg"
          fontSize="20px"
          colorScheme={ColumnColorScheme[props.name]}
        >
          {props.name}
        </Badge>
      </Heading>
      <div
        className="h-full w-[65%] bg-gray-200"
        style={{
          // border: "1px solid black",
          borderRadius: "15px",
          padding: "15px 10px",
        }}
      >
        <Droppable droppableId={props.name}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-3 h-full"
            >
              {props.issues?.map((issue, index) => (
                <Issue key={issue.id} issue={issue} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* {props.tasks.map(task => {
          return (
            <div className="task">
              <h3>{task.title}</h3>
              <p>
              #{task.number} opened {timeSince(task.created_at)}{" "}
              </p>
              <p>
              {task.author_association} | Comments: {task.comments}
              </p>
              </div>
              )
              })} */}
      </div>
    </div>
  )
}

export default Column

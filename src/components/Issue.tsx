import { IssueType } from "@/features/issues/issuesSlice"
import { timeSince } from "@/utils/utils"
import { Draggable } from "@hello-pangea/dnd"
import { Box, Text, useMediaQuery } from "@chakra-ui/react"
const Issue = (props: { issue: IssueType; index: number }) => {
  // const [isLargerThan700] = useMediaQuery(["(min-width: 800px)"], {})
  return (
    <Draggable draggableId={String(props.issue.id)} index={props.index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex w-full"
        >
          {/* <issueCard key={issue.id} issue={issue} index={index} /> */}
          <Box
            className="bg-white flex flex-col w-full"
            style={{
              border: "1px solid black",
              padding: "5px",
              borderRadius: "10px",
              gap: "2px",
            }}
            key={props.issue.id}
            fontSize={["10px", "sm", "lg", "xl"]}
          >
            <Text truncate={true}>{props.issue.title}</Text>
            <Text truncate={true}>
              #{props.issue.number} opened{" "}
              {timeSince(props.issue.created_at)}{" "}
            </Text>
            <Text truncate={true}>
              {props.issue.user.login} | Comments:
              {props.issue.comments}
            </Text>
          </Box>
        </div>
      )}
    </Draggable>
  )
}

export default Issue

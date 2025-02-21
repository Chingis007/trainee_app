import { Button, HStack, Input } from "@chakra-ui/react"
import FormHook from "./components/FormHook"
import Path from "./components/Path"
import Column from "./components/Column"
import { LoaderCircle } from "lucide-react"
import { useSelector } from "react-redux"
import {
  selectIssues,
  selectRepo,
  selectStatus,
  updateIssues,
} from "./features/issues/issuesSlice"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { useAppDispatch, useAppSelector } from "./app/hooks"
export type TaskStatus = "ToDo" | "In Progress" | "Done"
const App = () => {
  const issues = useSelector(selectIssues)
  const repo = useSelector(selectRepo)
  const dispatch = useAppDispatch()

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    dispatch(
      updateIssues({
        issueId: result.draggableId,
        targetColumn: result.destination.droppableId as TaskStatus,
        targetIndex: result.destination.index,
        sourceColumn: result.source.droppableId as TaskStatus,
        sourceIndex: result.source.index,
      }),
    )
  }
  const status = useAppSelector(selectStatus)

  return (
    <div className="flex flex-col w-full h-[100vh]" style={{ padding: "15px" }}>
      <FormHook />
      {issues && (
        <Path
          userName={repo.owner.login}
          repoName={repo.name}
          starNumber={Number(repo.stars)}
        />
      )}
      {status === "loading" ? (
        <div className="flex h-full w-full justify-center items-center">
          <LoaderCircle className="h-48 w-48 animate-spin text-foreground/20" />
        </div>
      ) : status === "failed" ? (
        <div className="flex h-full w-full justify-center items-center">
          <h1>Error: Possibly wrong URL used</h1>
        </div>
      ) : (
        issues && (
          <div className="flex flex-row select-none w-full flex-1">
            <DragDropContext onDragEnd={onDragEnd}>
              <Column name="ToDo" issues={issues.todoIssues} />
              <Column name="In Progress" issues={issues.inProgressIssues} />
              <Column name="Done" issues={issues.doneIssues} />
            </DragDropContext>
          </div>
        )
      )}
    </div>
  )
}

export default App

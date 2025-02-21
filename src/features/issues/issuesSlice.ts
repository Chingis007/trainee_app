import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import decompressResponse from "decompress-response"
import { TaskStatus } from "@/App"
import { useSelector } from "react-redux"
export type UserType = {
  login: string
  [key: string]: any
}
export type fetchedInfo = {
  owner: any
  stars: string
  name: string
}
export type IssueType = {
  id: number
  title: string
  number: number
  created_at: string
  comments: number
  user: UserType
  state: string
  author_association: string
  [key: string]: any
}

const initialState: {
  repo: fetchedInfo
  issues:
    | {
        todoIssues?: IssueType[]
        inProgressIssues?: IssueType[]
        doneIssues?: IssueType[]
      }
    | undefined
  status: "idle" | "loading" | "failed"
} = {
  repo: { owner: [], stars: "", name: "" },
  issues: undefined,
  status: "idle",
}
export const issuesSlice = createAppSlice({
  name: "issues",
  initialState,
  reducers: create => ({
    fetch_data: create.asyncThunk(
      async (url: string) => {
        const arr = url.split("/")
        const repo = arr[arr.length - 1]
        const user = arr[arr.length - 2]
        const localIssues = localStorage.getItem(`${user}/${repo}`)
        if (localIssues) {
          return {
            issues: {
              doneIssues: JSON.parse(localIssues).doneIssues,
              inProgressIssues: JSON.parse(localIssues).inProgressIssues,
              todoIssues: JSON.parse(localIssues).todoIssues,
            },
            repo_response: JSON.parse(localIssues).repo_response,
          }
        }
        const issues: IssueType[] = await (
          await fetch(
            // `https://api.github.com/search?q=repo:${user}/${repo}`,
            // `https://api.github.com/repos/${user}/${repo}/search/issues`,
            `https://api.github.com/search/issues?q=repo:${user}/${repo}`,
          )
        )
          .json()
          .then(response => {
            return response.items
          })
        const repo_response = await (
          await fetch(
            // `https://api.github.com/search?q=repo:${user}/${repo}`,
            `https://api.github.com/repos/${user}/${repo}`,
          )
        )
          .json()
          .then(response => {
            return {
              owner: response.owner,
              stars: response.stargazers_count,
              name: response.name,
            }
          })

        const infoFromIssues = issues.map(issue => {
          return {
            id: issue.id,
            title: issue.title,
            number: issue.number,
            created_at: issue.created_at,
            comments: issue.comments,
            user: issue.user.login,
            state:
              issue.state === "closed"
                ? "Done"
                : issue.assignees.length
                  ? "In Progress"
                  : "ToDo",
          }
        })
        const objOfIssuesArray = {
          todoIssues: infoFromIssues.filter(item => item.state === "ToDo"),
          inProgressIssues: infoFromIssues.filter(
            item => item.state === "In Progress",
          ),
          doneIssues: infoFromIssues.filter(item => item.state === "Done"),
        }
        localStorage.setItem(
          `${repo_response.owner.login}/${repo_response.name}`,
          JSON.stringify({ ...objOfIssuesArray, repo_response: repo_response }),
        )
        return { issues: objOfIssuesArray, repo_response: repo_response }
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.issues = action.payload.issues
          state.repo = action.payload.repo_response
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    updateIssues: create.reducer<{
      issueId: string
      targetColumn: TaskStatus
      targetIndex: number
      sourceColumn: TaskStatus
      sourceIndex: number
    }>((state, action) => {
      const issues = { ...state.issues }
      let issueToMove = undefined
      if (
        issues &&
        issues.todoIssues &&
        issues.inProgressIssues &&
        issues.doneIssues
      ) {
        if (action.payload.sourceColumn === "ToDo") {
          issueToMove = issues.todoIssues[action.payload.sourceIndex]
          issues.todoIssues.splice(action.payload.sourceIndex, 1)
        }
        if (action.payload.sourceColumn === "In Progress") {
          issueToMove = issues.inProgressIssues[action.payload.sourceIndex]
          issues.inProgressIssues.splice(action.payload.sourceIndex, 1)
        }
        if (action.payload.sourceColumn === "Done") {
          issueToMove = issues.doneIssues[action.payload.sourceIndex]
          issues.doneIssues.splice(action.payload.sourceIndex, 1)
        }
        if (action.payload.targetColumn === "ToDo" && issueToMove) {
          issues.todoIssues.splice(action.payload.targetIndex, 0, issueToMove)
        }
        if (action.payload.targetColumn === "In Progress" && issueToMove) {
          issues.inProgressIssues.splice(
            action.payload.targetIndex,
            0,
            issueToMove,
          )
        }
        if (action.payload.targetColumn === "Done" && issueToMove) {
          issues.doneIssues.splice(action.payload.targetIndex, 0, issueToMove)
        }
        if (issues) {
          state.issues = issues
          localStorage.setItem(
            `${state.repo.owner.login}/${state.repo.name}`,
            JSON.stringify({ ...issues, repo_response: state.repo }),
          )
        }
      }
    }),
  }),
  selectors: {
    selectIssues: container => container.issues,
    selectRepo: container => container.repo,
    selectStatus: container => container.status,
  },
})

export const { fetch_data, updateIssues } = issuesSlice.actions
export const { selectIssues, selectStatus, selectRepo } = issuesSlice.selectors

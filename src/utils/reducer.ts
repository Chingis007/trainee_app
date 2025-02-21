// const initialState = {
//   issues: [],
// };
// const issuesArray = (state = initialState, action) => {
//   switch (action.type) {
//     case 'FETCH_ISSUES':
//       return {
//         issues: fetch(`${url}/issues`)
//         count: state.count + 1,
//       };
//     default:
//       return state;
//   }
// };
// export default issuesArray;

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
// }

// export default function userReducer(state = initialState, action: any) {
//   switch (action.type) {
//     case FETCH_USERS_BEGIN:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       }

//     case FETCH_USERS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         items: action.payload.users,
//       }

//     case FETCH_USERS_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error,
//         items: [],
//       }

//     default:
//       return state
//   }
// }

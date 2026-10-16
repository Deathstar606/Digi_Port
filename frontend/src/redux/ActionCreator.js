import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchCases = () => (dispatch) => {
  dispatch(casesLoading(true));

  return fetch(baseUrl + "cases")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((cases) => dispatch(addCases(cases)))
    .catch((error) => dispatch(casesFailed(error.message)));
};

export const deleteCase = (_id) => (dispatch) => {
  const token = localStorage.getItem("token");
  return fetch(baseUrl + "cases/" + _id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((result) => {
      console.log("Deleted Case:", result);
      dispatch(fetchCases()); // re-fetch to update the list
    })
    .catch((error) => {
      console.log("Delete case error:", error.message);
      dispatch(casesFailed(error.message));
    });
};

export const updateCase = (_id, name, description) => (dispatch) => {
  const token = localStorage.getItem("token");
  const updatedData = { name, description };
  console.log(token);
  return fetch(baseUrl + "cases/" + _id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((result) => {
      console.log("Updated Case:", result);
      dispatch(fetchCases()); // re-fetch to update the list
    })
    .catch((error) => {
      console.log("Update case error:", error.message);
      dispatch(casesFailed(error.message));
    });
};

export const casesLoading = () => ({
  type: ActionTypes.CASE_LOADING,
});

export const casesFailed = (errmess) => ({
  type: ActionTypes.CASE_FAILED,
  payload: errmess,
});

export const addCases = (cases) => ({
  type: ActionTypes.ADD_CASE,
  payload: cases,
});

export const fetchPeople = () => (dispatch) => {
  dispatch(peopleLoading(true));

  return fetch(baseUrl + "people")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((people) => dispatch(addPeople(people)))
    .catch((error) => dispatch(peopleFailed(error.message)));
};

export const deletePeople = (_id) => (dispatch) => {
  const token = localStorage.getItem("token");
  return fetch(baseUrl + "people/" + _id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((result) => {
      console.log("Deleted Case:", result);
      dispatch(fetchPeople()); // re-fetch to update the list
    })
    .catch((error) => {
      console.log("Delete case error:", error.message);
      dispatch(peopleFailed(error.message));
    });
};

export const updatePople =
  (_id, name, designation, description) => (dispatch) => {
    console.log("invoked updateCase for ID:");
    const token = localStorage.getItem("token");
    const updatedPeople = { name, designation, description };

    return fetch(baseUrl + "people/" + _id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(updatedPeople),
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            let error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((result) => {
        console.log("Updated Case:", result);
        dispatch(fetchPeople()); // re-fetch to update the list
      })
      .catch((error) => {
        console.log("Update case error:", error.message);
        dispatch(peopleFailed(error.message));
      });
  };

export const peopleLoading = () => ({
  type: ActionTypes.PEOPLE_FAILED,
});

export const peopleFailed = (errmess) => ({
  type: ActionTypes.PEOPLE_FAILED,
  payload: errmess,
});

export const addPeople = (people) => ({
  type: ActionTypes.ADD_PEOPLE,
  payload: people,
});

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));

        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};
// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  dispatch(receiveLogout());
};
export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

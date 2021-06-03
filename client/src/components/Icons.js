const iconDelete = (
  <svg className="bi bi-trash" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="#dc3545" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"
    />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
      clipRule="evenodd"
    />
  </svg>
);

const iconEdit = (
  <svg className="bi bi-pencil-square" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="orange" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"
    />
    <path
      fillRule="evenodd"
      d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
      clipRule="evenodd"
    />
  </svg>
);

const iconLogo = (
  <svg className="bi bi-check2-all" width="2em" height="2em" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"
    />
    <path
      d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"
    />
  </svg>
);

const iconPrivate = (
  <svg className="bi bi-person-square" width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
    />
    <path
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"
    />
  </svg>
);

const iconUser = (
  <svg className="bi bi-person-circle" width="2em" height="2em" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
    />
    <path
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
    />
  </svg>
);

export {
  iconDelete, iconEdit, iconLogo, iconPrivate, iconUser,
};
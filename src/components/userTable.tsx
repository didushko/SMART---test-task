import { useEffect } from "react";
import { useAppDispatch, useFilteredSelector } from "../hooks/redux";
import { getUsers } from "../store/reducers/userActionCreators";
import { IUser } from "../interfaces/UserTableInterfaces";
import styles from "./userTable.module.css";
import { filtersSlice } from "../store/reducers/filtersSlice";

const UserTable = () => {
  const { users, error, isLoading } = useFilteredSelector();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={styles.user_table_container}>
      <div className={`${styles.row} ${styles.heading}`}>
        <div className={styles.cell}>
          <div>Name</div>
          <input
            placeholder="Name filter"
            onChange={(e) =>
              dispatch(
                filtersSlice.actions.setFilters({ name: e.target.value })
              )
            }
          ></input>
        </div>
        <div className={styles.cell}>
          <div>Username</div>
          <input
            placeholder="Username filter"
            onChange={(e) =>
              dispatch(
                filtersSlice.actions.setFilters({ username: e.target.value })
              )
            }
          ></input>
        </div>
        <div className={styles.cell}>
          <div>Email</div>
          <input
            placeholder="Email filter"
            onChange={(e) =>
              dispatch(
                filtersSlice.actions.setFilters({ email: e.target.value })
              )
            }
          ></input>
        </div>
        <div className={styles.cell}>
          {" "}
          <div>Phone</div>
          <input
            placeholder="Phone filter"
            onChange={(e) =>
              dispatch(
                filtersSlice.actions.setFilters({ phone: e.target.value })
              )
            }
          ></input>
        </div>
      </div>
      {users.map((user) => {
        return <UserRecord key={user.id} user={user} />;
      })}
    </div>
  );
};
export default UserTable;

const UserRecord = ({ user }: { user: IUser }) => {
  return (
    <div className={styles.row}>
      <div className={styles.cell}>{user.name}</div>
      <div className={styles.cell}>{user.username}</div>
      <div className={styles.cell}>{user.email}</div>
      <div className={styles.cell}>{user.phone}</div>
    </div>
  );
};

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./assets/fonts/font.css";
import "./assets/style.min.css";
import Loader from "./components/utils/Loader";
import socket from "./config/socket";
import AppRouter from "./routes/AppRouter";
import { checkAuth, logout } from "./services/auth";
import { setAuth, setUser } from "./store/reducers/authSlice";
import { setNotification, updateNotification } from "./store/reducers/notificationSlice";
import { setSettings } from "./store/reducers/settingsSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuth, token, user } = useSelector((state) => state.auth);

  const theme = useSelector((state) => state.theme.value);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

  }, [theme]);

  useEffect(() => {
    if (isAuth) {
      socket.on('notification', (data) => {
        const url = location.pathname;
        console.log(data)
        if (data?.user) {
          dispatch(setUser(data.user))
        }
        if (data?.message && data?.message?.dialogId ? `/account/messages/${data?.message?.dialogId}` != url : `/account/messages/system` != url) {
          dispatch(updateNotification(data))
        }
        if (data?.notification && `/account/callback/${data?.notification?.title}` != url) {
          dispatch(updateNotification(data))
        }
      })


      socket.on('logout/' + user.id, (data) => {
        if (data) {
          dispatch(logout())

        }
      })
    }
  }, [isAuth]);
  useEffect(() => {
    (async () =>
      await axios
        .get("https://ip.yooapp.ru")
        .then(
          ({ data }) => data?.ip && dispatch(setSettings({ ip: data.ip }))
        ))();

    if (token) {
      checkAuth()
        .then((data) => {
          if (data && data.status === -1) {
            dispatch(logout());
          } else {
            if (data?.message) {
              dispatch(
                setNotification({
                  message: data.message,
                })
              )
            }
            if (data?.notification) {
              dispatch(
                setNotification({
                  notification: data.notification,
                })
              )
            }
            data && dispatch(setUser(data));
            data && dispatch(setAuth(true));
          }
        })
        .catch(() => dispatch(logout()))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      socket.io.opts.query = false
      socket.connect();
    }

  }, []);

  if (loading) {
    return <Loader full />;
  }

  return <AppRouter />;
}

export default App;

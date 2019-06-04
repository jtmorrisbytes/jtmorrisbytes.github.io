/*
    Nav.js

    The main navigation for the webpage


*/
import React from "react"
import "./Nav.css"


class Nav extends React.Component {
    constructor(){
        super()
    }
    render(){
        return <nav id="main-navigation">
            <div id="brand">
                <p className="logo-text">Jordan T Morris</p>
            </div>
            <div id="nav-links">
                <a id="projects" href="#Projects">Projects</a>
                <a id="about" href="#About">About</a>

                <a id="contact" href="#Contact">Contact</a>
                <a id="resume" href="https://www.linkedin.com/ambry/?x-li-ambry-ep=AQFEnHdhyLaoEAAAAWse7zdVmqGksFfq-sZOy2ws8c3NZxojIIz8n-mkz-yWB5VjUegWTrDiQNAno0ewbCg5V_-k_aK2CxnlA2dSc9kzeKkVaKqdM8dcDysnt1WMxoVG-wdfDh-QL7ro5SNbuNcFLKET7bhbNXWaI07zp7jUrzBJOv1ZZQ7jNkDkUaiw_2Qn153x_aQGanQxWCvMDKd-oPDf_6Cm6bmk7eJpD6HBGK7J78A0j48UvisUkxz655GhG6vV1gKiSQhj0yj7yWvvl0CbiRKtM7aoIMo2HQj4O2265WblSWd2a_OSCQDWFN6PhUwo-TIy3pJpPZV8MnOrJ7putrAldEGUrDqwGoxukvAJjJMp1-BPsBv2BqDXJEmx-u4PnfJoiSkMSJ2DWBgHhhhZRo41_xSIU96ASzePPN2FUyICa72ExLWQAQo3jfsc4MyMFIAfNUphm-LmvWe2oKPbwzui7_ea0TQSHvo9goUhU1t0tIUy89PtVhF5D9OQeM21yUzNahC0tQPdFE0hlzzxdMgmhJHuozuiOLFJios1ESMIVT46OD9uR6NLhTgD&x-ambry-um-filename=Jordan%20Morris.pdf">Resume </a>
            </div>

        </nav>
    }
}
export default Nav
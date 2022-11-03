import { useEffect, useReducer, useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useInput from "../../../hooks/useInput";
import Prompt from "../../../commonComponents/prompt";
import "./cards.scss";
import "../index.css";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Menu,
  MenuItem
} from "@mui/material";
export default function Cards() {
  //主体
  const [cards] = useState([[], [], []]);
  const [cardId,setCardId]=useState("");
  const [anchor,setAnchor]=useState(null);
  const { data=[], loading, err } = useFetch(
    "http://localhost:3000/cards/getCards"
  );
  useEffect(() => {
    console.log(data, loading, err);
  }, [data]);
  function showAnswer(e) {
    let element = e.target;
    while (!element.classList.contains("card")) {
      element = element.parentNode;
    }
    element.classList.toggle("card-show");
  }
  function setDone(e) {
    e.target.classList.toggle("done");
    e.stopPropagation();
  }
  function openMenu(e,id){
    e.stopPropagation();
    setAnchor(e.currentTarget);
    setCardId(id)
  }
  function handleClose(e){
    e.stopPropagation();
    setAnchor(null)
  }
  function removeCard(e,id){
    handleClose(e);
    fetch("http://localhost:3000/cards/removeCard/"+id);
  }
  //输入框
  const [open, setOpen] = useReducer((pre) => !pre, false);
  const [question] = useInput("");
  const [answers, setAnswers] = useState([""]);
  const [keys, setKeys] = useState(["", "", ""]);
  function addAnswerInput(e) {
    if (e.keyCode) {
      if (e.keyCode === 13) {
        setAnswers([...answers, ""]);
      } else {
        return;
      }
    }
    setAnswers([...answers, ""]);
  }
  function handlerAnswer(e, key) {
    answers[key] = e.target.value;
    setAnswers([...answers]);
  }
  function handlerKeys(e, key) {
    keys[key] = e.target.value;
    setKeys([...keys]);
  }

  //上传
  const [mes, sendMes] = useState("");
  function submit() {
    const bodyData = {
      question: question.value,
      answers,
      keys,
    };
    if (question.value && answers[0] && keys[0]) {
      fetch("http://localhost:3000/cards/addCard", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(bodyData),
      });
    } else {
      sendMes("信息不完整" + Math.random());
    }
  }
  return (
    <>
      <Dialog open={open}>
        <Prompt mes={mes} delay={1500}></Prompt>
        <DialogTitle>添加一个卡片</DialogTitle>

        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Question"
            fullWidth
            variant="standard"
            style={{ marginBottom: 30 }}
            {...question}
          />
          {keys.map((v, k) => (
            <TextField
              value={v}
              onChange={(event) => handlerKeys(event, k)}
              key={k}
              size="small"
              margin="dense"
              id="name"
              label="Key1"
              variant="outlined"
              style={{ width: "33.3%" }}
            />
          ))}
          {answers.map((v, k) => (
            <TextField
              value={v}
              onChange={(event) => handlerAnswer(event, k)}
              onKeyDown={addAnswerInput}
              autoFocus={k === 0 ? false : true}
              key={k}
              size="medium"
              margin="dense"
              id="name"
              label={`Answer-${k + 1}`}
              fullWidth
              variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Fab onClick={setOpen} color="error" size="small" aria-label="close">
            <CloseRoundedIcon />
          </Fab>
          <Fab
            onClick={addAnswerInput}
            color="primary"
            size="small"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <LoadingButton
            onClick={submit}
            variant="contained"
            loadingPosition="start"
            startIcon={<SendIcon />}
          >
            上传
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Button
        size="small"
        variant="contained"
        onClick={setOpen}
        startIcon={<AddIcon />}
      >
        添加
      </Button>
      <div id="cards-container">
        <div className="column-container">
          {data.map(({id,question,keys,answers}) => (
            <div key={id} className="card"  onClick={showAnswer}>
              <div className="question-container">
                <i className="iconfont icon-chenggong" onClick={setDone}></i>
                <div className="question">{question}</div>
                <ul className="keys">
                  {
                    keys.map((str,k)=><li key={k}>{str}</li>)
                  }
                </ul>
                <div className="more-container">
                    <i  onClick={(e)=>openMenu(e,id)} className="iconfont icon-gengduo"></i>
                    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
                      <MenuItem onClick={(e)=>removeCard(e,cardId)}>删除</MenuItem>
                      <MenuItem>修改</MenuItem>
                    </Menu>
                </div>
              </div>
              <div className="answer-container">
                <div className="answer">
                  <ol>
                    {answers.map((v, k) => (
                      <li key={k}>{v}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="column-container"></div>
        <div className="column-container"></div>
      </div>
    </>
  );
}

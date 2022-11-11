import "./editor.scss";
import useInput from "../../hooks/useInput";
import Prompt from "../../commonComponents/prompt";
import { micromark } from "micromark";
import { useEffect, useReducer, useRef, useState } from "react";
import request from "../../utility/request.ts";
export default function Editor() {
  const [points, addPoint] = useReducer(
    (pre, num) => (pre + num >= 0 ? pre + num : 0),
    1
  ); //归纳数
  const [isShowClasses, showClasses] = useReducer((pre) => !pre, false); //类别下拉栏的展示
  const [classesAttributes, setClasses] = useInput(""); //收集类别
  const [bodyAttributes] = useInput(""); //收集body
  const [titleAttributes] = useInput(""); //收集title
  const [keys, setKeys] = useState([]); //收集keys
  const [pointsValue, setPoints] = useState([""]); //收集归纳值
  const [mes, sendMes] = useState(""); //发送提示信息
  const keyInput = useRef();
  const [classes, getClasses] = useState([]);
  const [isSubmit, changeSubmit] = useState(false);
  useEffect(() => {
    request("/articles/getAllClasses")
      .then((res) => {
        let arr = [];
        res.map((v) => {
          if (!arr.includes(v.classes)) {
            arr.push(v.classes);
          }
        });
        getClasses(arr);
      });
  }, []);
  function changePoint(e, index) {
    pointsValue[index] = e.target.value;
    setPoints(pointsValue);
  }
  function chooseClass(e) {
    if (e.target.tagName === "LI") {
      setClasses(e.target.innerText);
    }
  }
  function addKey(e) {
    if (
      (e.type === "blur" || e.key === "Enter") &&
      keyInput.current.value !== ""
    ) {
      if (keys.length === 3) {
        sendMes(`最多3个关键词${Math.random()}`);
      } else {
        setKeys([...keys, keyInput.current.value]);
        keyInput.current.value = "";
      }
    }
  }
  function delateKey(targetKey) {
    setKeys(keys.filter((_, key) => !(targetKey === key)));
  }
  function submit(e) {
    if (!isSubmit) {
      const data = new FormData();
      const { value: classes } = classesAttributes;
      const { value: body } = bodyAttributes;
      const { value: title } = titleAttributes;
      if (!(classes && body && title && keys)) {
        sendMes("信息不完整" + Math.random());
        return;
      }
      keys.map((v) => data.append("keys", v));
      data.append("classes", classes);
      data.append("body", body);
      data.append("title", title);
      pointsValue.map((v) => data.append("mainPoints", v));
      request("/articles/upload", {
        method: "post",
        body: data,
        credentials: "include",
      })
        .then((res) => sendMes(res.mes + Math.random()))
        .then(() => {
          e.target.classList.add("icon-chenggong");
          e.target.classList.toggle("icon-shangchuan");
          changeSubmit(!isSubmit)
        });
    }else{
        sendMes('已发布' + Math.random())
    }
  }
  return (
    <div id="editor-container">
      <header>
        <input
          autoFocus
          className="title"
          placeholder="在这里输入文章标题..."
          {...titleAttributes}
          maxLength="12"
        />
        <div className="classes">
          <input
            maxLength="8"
            {...classesAttributes}
            onFocus={showClasses}
            onBlur={showClasses}
            placeholder="在这里输入文章类别..."
          ></input>
          {isShowClasses ? (
            <ul
              className="default"
              onClick={chooseClass}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              {classes.map((v, k) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="keys">
          <input
            maxLength="8"
            placeholder="关键字..."
            onKeyDown={addKey}
            onBlur={addKey}
            ref={keyInput}
          ></input>
          <ul>
            {keys.map((v, k) => (
              <li key={k} onClick={() => delateKey(k)}>
                {v}
              </li>
            ))}
          </ul>
        </div>
        <i className="iconfont icon-shangchuan" onClick={submit}></i>
      </header>
      <main>
        <textarea
          {...bodyAttributes}
          className="editor"
          contentEditable='true'
          placeholder="在这里输入文章主体..."
        ></textarea>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: micromark(bodyAttributes.value) }}
        ></div>
        <div className="mainPoints">
          <div>
            归纳
            <i
              className="iconfont icon-xinzeng"
              title="新增"
              onClick={() => {
                addPoint(1);
                pointsValue.push("");
                setPoints(pointsValue);
              }}
            ></i>
            <span
              onClick={() => {
                addPoint(-1);
                pointsValue.pop();
                setPoints(pointsValue);
              }}
            >
              ➖
            </span>
          </div>
          <ol>
            {Array.apply(null, Array(points)).map((_, k) => (
              <li key={k}>
                <input
                  onChange={(e) => changePoint(e, k)}
                  autoFocus={k === 0 ? false : true}
                  onKeyDown={(e) => e.key === "Enter" && addPoint(1)}
                  placeholder="在这里输入..."
                />
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Prompt mes={mes} delay={1500} />
    </div>
  );
}

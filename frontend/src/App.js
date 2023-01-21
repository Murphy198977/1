import "./App.css";
import { Grid } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { useState, useEffect } from "react";

function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  function getNewFeedback() {
    async function fetchData() {
      const response = await await fetch("/api/feedback");
      const json = await response.json();
      setData(json);
      console.log(json);
    }
    fetchData();
  }

  function submitTags() {
    // send to server
    console.log(selected);
    fetch("/api/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        tags: [...selected],
      }),
    });
    setSelected([]);
    getNewFeedback();
  }

  const [selected, setSelected] = useState([
  ]);
  const [data, setData] = useState(null);
  useEffect(() => {
    getNewFeedback();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Textarea
          readOnly
          bordered
          initialValue={"Loading..."}
          value={data ? data.feedback : "Loading..."}
          width="80%"
          size="lg"
        />
        <br />
        <Checkbox.Group
          orientation={isDesktop ? "horizontal" : "vertical"}
          value={selected}
          onChange={setSelected}
        >
          <Checkbox value="actionable">Actionable</Checkbox>
          <Checkbox value="justified">Justified</Checkbox>
          <Checkbox value="specific">Specific</Checkbox>
        </Checkbox.Group>
        <br />
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Button
              color="primary"
              auto
              onClick={() => {
                submitTags();
              }}
            >
              Submit and next
            </Button>
          </Grid>
        </Grid.Container>
      </header>
    </div>
  );
}

export default App;
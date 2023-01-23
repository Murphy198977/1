import "./App.css";
import { Grid } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";

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
    }
    fetchData();
  }

  function submitTags() {
    fetch("/api/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: data._id,
        tags: [...selected],
      }),
    });
    setSelected([]);
    getNewFeedback();
  }

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(null);
  useEffect(() => {
    getNewFeedback();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Image
          style={{ paddingBottom: "6px" }}
          width={320}
          height={180}
          src="/phil.png"
          alt="Philosopher"
        />
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

import "./App.css";
import { FormGenerator } from "./components/FormGeneratorComponent";
import { GeneratedForm } from "./components/GeneratedFormComponent";

const options = ["text", "checkbox", "select"];

function App() {
  return (
    <div className="flex justify-around">
      <FormGenerator inputTypeOptions={options} />
      <GeneratedForm />
    </div>
  );
}

export default App;

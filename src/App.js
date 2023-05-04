import axios from "axios"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {


  const [text, setText] = useState("")
  const [email, setEmail] = useState("")
  const [tomail, setTOmail] = useState("")
  const [item, setItem] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!text || !email || !item) {
        return toast.error("Please fill up those fields")
      }
      setLoading(true)
      const { data } = await axios.post("https://mailsender-ox40.onrender.com/sendmail", {
        text,
        email,
        item,
        tomail
      })
      setLoading(false)
      toast.success(data.message)
    } catch (err) {
      console.log(err)
      toast.error("There was a problem")
    }
  }

  return (
    <div className="App" onSubmit={handleSubmit}>
      <ToastContainer position="bottom-center" limit={1} />
      <form>
        <h3>Send A Mail</h3>
        <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Message" />
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email sender gmail" />
        <input type="text" name="item" value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item name" />
        <span>Optional : If you try It this Application work or not??</span>
        <input type="email" name="email" value={tomail} onChange={(e) => setTOmail(e.target.value)} placeholder="Enter that gmail where you received your Mail" />
        <button type="submit">{loading ? "Sending.." : "Send"}</button>
      </form>
    </div>
  );
}

export default App;

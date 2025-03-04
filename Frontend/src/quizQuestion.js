import React,{useState} from "react";
import { Card, CardContent, Radio, Typography ,Drawer,Divider,ListItemButton} from "@mui/material";
import { Button, Checkbox ,Box,List,ListItem,ListItemText} from "@mui/material";
import { ArrowLeft ,Menu} from "lucide-react";
import './quizQuestion.scss';
import { FormControlLabel } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MultipleSectionsQuestions from "./MultipleSectionsQuestions";
import { toast } from "react-hot-toast";
import AWS from 'aws-sdk';
import { useSearchParams,useNavigate } from "react-router-dom";
import QuizLoader from "./QuizLoader";
const QuizQuestion = () => {
  const [searchParams]=useSearchParams()
  const navigate = useNavigate()
    const courseId = searchParams.get('courseId')||"";
    const [apiParam , setApiParam] = useState("")
 
  const s3 = new AWS.S3();
  const transformQuizData = (quizData) => {
    if (!quizData?.data?.quiz) return { sections: [] };
  
    return {
      sections: quizData.data.quiz.map((quizItem, sectionIndex) => ({
        sectionId: sectionIndex + 1, // Assigning an incremental section ID
        sectionTitle: quizItem.title,
        questions: quizItem.questions.map((question, questionIndex) => ({
          questionId: sectionIndex * 100 + questionIndex + 1, // Unique ID for each question
          questionText: question.question,
          marks: question.marks,
          options: question.options.map((option, optionIndex) => ({
            optionId: String.fromCharCode(97 + optionIndex), // Converts 0 -> 'a', 1 -> 'b', etc.
            text: option,
            isCorrect: option === question.correct_answer, // Check if the option is correct
          })),
        })),
      })),
    };
  };
  
  // Example Usage:
  const quizData = JSON.parse(localStorage.getItem("quizData") || "{}");
  const transformedData = transformQuizData(quizData);
  console.log(transformedData);
  

  
  const [selectedValue, setSelectedValue] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Default section
  
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [Loading, setLoading] = useState(false);
  const currentSection = transformedData.sections[sectionIndex];
  const currentQuestion = currentSection?.questions[questionIndex];
  console.log({ currentQuestion})
 const totalQuestions = transformedData?.sections?.reduce((sum,section)=>sum+section.questions.length, 0)||0;
 const currentQuestionValue = transformedData?.sections?.slice(0, sectionIndex)?.reduce((sum, sec) => sum + sec.questions.length, 0) + questionIndex + 1; // Sum previous + current index

 
//  AWS.config.update({
//    accessKeyId: "AKIATTSKGAGFDMILU77D", 
//    secretAccessKey: "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", 
//    region: 'us-east-1', // Adjust the region if needed
//  });
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "us-east-1", // Adjust the region if needed
});
  const handleChange = (index,questionText,optionName) => {
    setSelectedValue(index);
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionText]: optionName
    }));
  };


  const isLastQuestion =
  sectionIndex === transformedData.sections.length - 1 &&
  questionIndex === transformedData.sections[sectionIndex].questions.length - 1;

  const handleRandomQuestionSelect = (question) => {
    console.log({ question})
    // Find the section index where the selected question belongs
    const newSectionIndex = transformedData?.sections.findIndex((sec) =>
      sec.questions.some((q) => q.questionId === question.questionId)
    );
  
    // Update state to reflect the selected question and section
    if (newSectionIndex !== -1) {
      setSectionIndex(newSectionIndex);
      setQuestionIndex(
        transformedData.sections[newSectionIndex].questions.findIndex((q) => q.questionId === question.questionId)
      );
    }
  };
  const handleEndQuiz = () =>{
    setLoading(true)
    const timestamp = Date.now();
    const quizResponsesJSON = generateQuizResponsesJSON(transformedData, selectedAnswers);
    console.log(quizResponsesJSON,typeof quizResponsesJSON ,quizResponsesJSON.type,"aaaaaaaaaaaaaaaa")
    const key = `learnerResponses/${courseId}`;
    const jsonString = JSON.stringify(quizResponsesJSON, null, 2)
    const params = {
      Bucket: "quadragen-content-files",
      Key: key,
      Body: jsonString,
      ContentType: "application/json"

    };
     s3.upload(params, (err, data) => {
          if (err) {
            setLoading(false)
            console.error('Error uploading file:', err);
            // setLoading(false);
            toast.error("Upload failed, please try again.");
            // setResponseFile("")
            // setFileFailure(err);
            // setUploadingFile(false);
          } else {
        
            // setResponseFile(data);
            // setShowForm(true);
            // setUploadingFile(false);
            // Optionally, you can use data.Location as the URL of the uploaded file.
          }
        });
    setTimeout(()=>{
     
      setLoading(false)
      toast.success("Upload successful!",{
          style: {
        background: "#E6F4EA", // Light green background
        color: "#1E4620", // Dark green text for contrast
        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid #A3D9A5", // Green border for a soft look
        boxShadow: "0px 4px 10px rgba(163, 217, 165, 0.5)", // Subtle glow
      },
      });
    
      navigate(`/result-recommend?courseId=${courseId}`)},60000)   
    
  } 
  const handleNextQuestion = () => {
    if (questionIndex < currentSection.questions.length - 1) {
      // Move to the next question within the same section
      setQuestionIndex((prev) => prev + 1);
      setSelectedValue(null);
    } else if (questionIndex === currentSection.questions.length - 1 && sectionIndex < transformedData.sections.length - 1) {
      // Move to the next section if the current section is finished
      setSectionIndex((prev) => prev + 1);
      setQuestionIndex(0);
      setSelectedValue(null);
    } else {
      console.log(selectedAnswers)
      const quizResponsesJSON = generateQuizResponsesJSON(transformedData, selectedAnswers);
      handleEndQuiz()
      navigate(`/result-recommend?courseId=${apiParam}`)
    }}
    const generateQuizResponsesJSON = (quizData, selectedAnswers) => {
      return {
        data: {
          courseId:courseId,
          quiz: quizData.sections.map((section) => ({
            title: section.sectionTitle,
            questions: section.questions.map((question,index) => {
              const selectedAnswer = selectedAnswers[question.questionText] || null;
              const correctOption = question.options.find((option) => option.isCorrect)?.text || "Not Available";
    
              return {
                question: question.questionText,
                selected_answer: selectedAnswer,
                correct_answer: correctOption,
                is_correct: selectedAnswer === correctOption
              };
            })
          }))
        }
      };
    };
    
  return (
    <Typography variant="div" sx ={{width:"100%", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}} className="header p-6 max-w-4xl mx-auto" >
     
    <Typography variant="div" className="flex items-center justify-between mb-4 header-content">
      <Button startIcon={<ArrowLeft />} color="#00000" className="absolute left-6">
        Back 
      </Button>
      <div className="ml-auto flex gap-2 header-content-left">
        <Button variant="outlined" onClick={handleEndQuiz} sx={{ color: "#6439BF", border:"1px solid #6439BF", "&:hover": { backgroundColor: "#f0e9ff" ,color:"#6439BF"} }}>End Quiz</Button>
        <Button variant="contained" onClick={handleNextQuestion} sx={{ backgroundImage:
                            "linear-gradient(135deg, #FF69B4, #8A2BE2)", // Gradient background
                      "&:hover": {
                        backgroundImage:
                            "linear-gradient(135deg,#8A2BE2, #FF69B4)", // Darker blue on hover
                      } }}>
 { isLastQuestion ? "Finish":"Next"} →
</Button>
      </div>
    </Typography>
    <Typography variant="div" sx={{ display: "flex", flexDirection: "row", gap: 4, width: "100%", justifyContent: "flex-start", alignItems: "flex-start", padding: "10px" ,paddingLeft:"30px",paddingRight:"10px"}}>
        <Card sx={{ width: "80%", padding: "12px", borderRadius: "14px", marginTop: "20px", boxShadow: "0 4px 3px 0 #e7e8f8", border:"1px solid #e7e8f8 " }}>
          <CardContent sx={{ display: "flex", flexDirection: "row", gap: 10,justifyContent:"flex-start" }}>
            <Typography sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems:"left" ,width:"60%"}}>
            <div className="text-lg font-semibold mb-2" style={{ fontSize: "16px", fontWeight: "bold",textAlign:"left" }}>
              Question {currentQuestionValue} of {totalQuestions}
            </div>
            <Typography variant="div" sx={{ fontSize: "16px", textAlign: "left" }}>
              {currentQuestion?.questionText}
            </Typography>
            </Typography>
            <Typography>
            <div className="font-semibold mt-4" style={{ fontSize: "16px", fontWeight: "bold" }}>
              Select the Right Answer
            </div>
            <Typography variant="div" sx={{ display: "flex", gap: "10px", flexDirection: "column",paddingTop:"24px" }} className="space-y-2 mt-2">
              {currentQuestion?.options.map((option, index) => (
                <Typography variant="div" sx={{ border: "2px solid #d5d5d5", borderRadius: "8px", padding: "10px", marginBottom: "10px" ,display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"8px",width:"300px"}} key={index} className="flex items-center border p-3 rounded-md">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedValue === option.optionId}
                        onChange={() => handleChange(option.optionId, currentQuestion?.questionText,option?.text
                        )}
                        sx={{
                          color: "#6439BF",
                          "&.Mui-checked": {
                            color: "#6439BF",
                          },
                        }}
                      />
                    }
                    label={option.text}
                  />
                </Typography>
              ))}
            </Typography>
            </Typography>
          </CardContent>
        </Card>
        {!drawerOpen ? (
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#000", marginLeft: "auto", paddingRight:"20px" }}>
            <MenuIcon />
          </IconButton>
        ) : (
          <MultipleSectionsQuestions
            openQuestionPanel={drawerOpen}
            setOpenQuestionPanel={setDrawerOpen}
            onRandomQuestionSelect={handleRandomQuestionSelect}
            activeSection={currentSection}
            currentQuestionId={currentQuestion?.questionId}
            onSubmitQuiz={() => {}}
            onSubmitSection={() => {}}
            QuizSections={transformedData.sections}
            transformedData={transformedData}
            currentSectionId={sectionIndex}
          />
        )}
      </Typography>
      {Loading && <QuizLoader open={Loading} attemptingQuiz={true} />}
    </Typography>
  );
};

export default QuizQuestion;
export const useSpeech = () => {
	const speech = useSpeechRecognition({
		continuous: true,
	});
	const SpeechGrammarList =
		window.SpeechGrammarList || window.webkitSpeechGrammarList;
	const speechRecognitionList = new SpeechGrammarList();
	speechRecognitionList.addFromString(1);
	speech.recognition!.grammars = speechRecognitionList;
	const { isListening, result } = speech;

	const fetchAudio = async (text: string) => {
		const { data } = await useFetch(`/api/audio/${text}`, {
			method: "GET",
		}).blob();
		if (!data.value) return;
		const blobAudio = new Blob([data.value], { type: "audio/mp3" });
		const audioUrl = URL.createObjectURL(blobAudio);
		const audio = new Audio(audioUrl);
		audio.play()
	};

	return {
		isListening,
		result,
		speech,
		fetchAudio,
	};
};

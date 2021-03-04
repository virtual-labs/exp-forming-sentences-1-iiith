<script type="text/javascript">

function getOption(lang){
	if(lang=="null")
	{
		alert("Select language");
		return;
	}
	$('#words_sentence').load('CLexp1.php?lang='+lang+'&words_selected=%&words=%&possible_sent=%&turn=0&position=%');
}

</script>

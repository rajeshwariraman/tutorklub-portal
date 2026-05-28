const { data, error: dbError } = await supabase
  .from("Students")
  .insert([{
    "Login_id": login_id,
    "Child_Name": form.child_name,
    "Parent_Name": form.parent_name,
    "Grade": parseInt(form.grade),
    "Subject": form.subject,
    "Tutor_Id": TUTOR_ID
  }])
  .select();

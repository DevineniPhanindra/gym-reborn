const deleteMember = async (id) => {
  console.log("Deleting member:", id);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this member?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/members/${id}`);
    alert("Member Deleted Successfully");
    fetchMembers();
  } catch (err) {
    console.log(err);
  }
};
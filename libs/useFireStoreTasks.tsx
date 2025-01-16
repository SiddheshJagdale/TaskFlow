// hooks/useFirestoreTasks.ts
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setTasks } from "@/store/reducers/taskSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseStore/firebase";
import { Task } from "@/store/reducers/taskSlice";

const useFirestoreTasks = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tasksCollectionRef = collection(db, "tasks");

    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      const tasksData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Task)
      );
      dispatch(setTasks(tasksData));
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useFirestoreTasks;

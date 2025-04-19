import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const load = (key, fallback = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const DataProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState(() => load('courseTypes'));
  const [courses, setCourses] = useState(() => load('courses'));
  const [offerings, setOfferings] = useState(() => load('offerings'));
  const [registrations, setRegistrations] = useState(() => load('registrations'));

  useEffect(() => save('courseTypes', courseTypes), [courseTypes]);
  useEffect(() => save('courses', courses), [courses]);
  useEffect(() => save('offerings', offerings), [offerings]);
  useEffect(() => save('registrations', registrations), [registrations]);

  return (
    <DataContext.Provider
      value={{
        courseTypes, setCourseTypes,
        courses, setCourses,
        offerings, setOfferings,
        registrations, setRegistrations
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

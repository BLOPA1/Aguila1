'use client';

import { useEffect, useState } from 'react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [countries, setCountries] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    country: '',
    topic: ''
  });

  // Helper function to convert date to 'Wed, 31 Jul 2024 10:48:27 GMT' format
  const formatDate = (dateStr) => {
    if (!dateStr) return ''; // Return empty string if dateStr is empty
    const [month, day, year] = dateStr.split('/');
    return new Date(`${month}/${day}/${year}`).toUTCString();
  };

  // Helper function to clean up titles by removing content within curly braces
  const cleanTitle = (title) => {
    return title.replace(/\{.*?\}/g, '').trim();
  };

  // Fetch news and options on component mount and when filters change
  useEffect(() => {
    async function fetchNews() {
      try {
        const formattedDate = filters.date ? formatDate(filters.date) : '';
        const query = new URLSearchParams({
          date: formattedDate,
          country: filters.country,
          topic: filters.topic
        }).toString();

        const response = await fetch(`/api/news?${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Clean titles before setting state
        const cleanedData = data.map((item) => ({
          ...item,
          title: cleanTitle(item.title)
        }));
        setNews(cleanedData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    async function fetchOptions() {
      try {
        const response = await fetch('/api/options');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { countries, topics } = await response.json();
        setCountries(countries);
        setTopics(topics);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }

    fetchNews();
    fetchOptions();
  }, [filters]);

  // Event handler for filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Noticias</h1>
      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <label style={styles.label}>
            Fecha:
            <input
              style={styles.input}
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.label}>
            País:
            <select
              style={styles.input}
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
            >
              <option value="">Seleccionar País</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.label}>
            Tópico:
            <select
              style={styles.input}
              name="topic"
              value={filters.topic}
              onChange={handleFilterChange}
            >
              <option value="">Seleccionar Tópico</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {news.length === 0 ? (
        <p style={styles.noNews}>No se encontraron noticias.</p>
      ) : (
        <ul style={styles.newsList}>
          {news.map((item, index) => (
            <li key={index} style={styles.newsItem}>
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.newsLink}>
                {item.title}
              </a> - {new Date(item.date).toLocaleDateString()} - {item.country} - {item.topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    color: '#FFF', // Color de texto blanco
    backgroundColor: '#000', // Fondo negro
    minHeight: '100vh', // Altura mínima para cubrir toda la pantalla
  },
  title: {
    textAlign: 'center',
    color: '#00BCD4', // Azul brillante para destacar el título
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Permite que los filtros se ajusten en pantallas pequeñas
    gap: '10px',
    marginBottom: '20px',
  },
  filterGroup: {
    flex: '1',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #00BCD4', // Borde azul claro
    backgroundColor: '#333', // Fondo oscuro para los inputs
    color: '#FFF', // Texto blanco
  },
  newsList: {
    marginTop: '20px',
    listStyleType: 'none',
    padding: '0',
  },
  newsItem: {
    padding: '10px',
    borderBottom: '1px solid #444', // Línea divisoria gris
    marginBottom: '10px',
  },
  newsLink: {
    textDecoration: 'none', // Sin subrayado
    color: '#FF5722', // Naranja brillante para los títulos de noticias
  },
  noNews: {
    textAlign: 'center',
    color: '#FF5722', // Naranja brillante para el mensaje de no noticias
  },
};

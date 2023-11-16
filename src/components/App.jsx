import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import { nanoid } from 'nanoid';
import { QuizForm } from './QuizForm/QuizForm';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { fetchQuizzes } from 'api';
import { createQuize } from 'api';
// import { async } from 'q';

const intialFilters = {
  topic: '',
  level: 'all',
};

export class App extends Component {
  state = {
    quizItems: [],
    loading: false,
    error: false,
    filters: intialFilters,
  };

  async componentDidMount() {
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      this.setState({
        filters: JSON.parse(savedFilters),
      });
    }

    try {
      this.setState({ loading: true, error: false });
      const quizzes = await fetchQuizzes();
      toast.success('We found quizzes!');
      this.setState({ quizItems: quizzes });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      localStorage.setItem('quiz-filters', JSON.stringify(this.state.filters));
    }
  }

  updateTopicFilter = newTopic => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          topic: newTopic,
        },
      };
    });
  };

  updateLevelFilter = newLevel => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          level: newLevel,
        },
      };
    });
  };

  resetFilters = () => {
    this.setState({
      filters: intialFilters,
    });
  };

  deleteQuiz = quizId => {
    console.log('deleteQuiz', quizId);
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(item => item.id !== quizId),
      };
    });
  };

  addQuiz = async newQuiz => {
    try {
      this.setState({ loading: true, error: false });
      const quiz = await createQuize(newQuiz);
      this.setState(prevState => {
        return {
          quizItems: [...prevState.quizItems, quiz],
        };
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { quizItems, filters, loading, error } = this.state;

    const visibleQuizItems = quizItems.filter(item => {
      const hasTopic = item.topic
        .toLowerCase()
        .includes(filters.topic.toLowerCase());

      if (filters.level === 'all') {
        return hasTopic;
      }

      const matchesLevel = item.level === filters.level;
      return hasTopic && matchesLevel;
    });

    return (
      <Layout>
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar
          filters={filters}
          onUpdateTopic={this.updateTopicFilter}
          onUpdateLevel={this.updateLevelFilter}
          onReset={this.resetFilters}
        />
        {loading && <b>Loading quiz items...</b>}
        {error && <b>Whoops! Error! Plase reload this page!</b>}
        {visibleQuizItems.length > 0 && (
          <QuizList items={visibleQuizItems} onDelete={this.deleteQuiz} />
        )}
        <Toaster position="top-right" />
        <GlobalStyle />
      </Layout>
    );
  }
}

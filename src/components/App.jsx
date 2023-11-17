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
import { deleteQuisById } from 'api';
import { ErrorMassage } from './ErrorMassage';

import { Bars } from 'react-loader-spinner';
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

  deleteQuiz = async quizId => {
    try {
      this.setState({ loading: true, error: false });
      const deletedQuizItem = await deleteQuisById(quizId);
      this.setState(prevState => {
        return {
          quizItems: prevState.quizItems.filter(
            item => item.id !== deletedQuizItem.id
          ),
        };
      });
      toast.success('Delete quiz!');
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
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
      toast.success('Add quiz!');
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
        {loading && (
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        {error && (
          <ErrorMassage>Whoops! Error! Plase reload this page!</ErrorMassage>
        )}
        {visibleQuizItems.length > 0 && (
          <QuizList items={visibleQuizItems} onDelete={this.deleteQuiz} />
        )}
        <Toaster position="top-right" />
        <GlobalStyle />
      </Layout>
    );
  }
}

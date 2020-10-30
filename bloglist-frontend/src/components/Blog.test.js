import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
const blog = {
    title: "test title",
    author: "test author",
    likes: 3,
    url: "https://test.com"
}
const updateLike = () => { }
const removeBlog = () => { }

test('renders content', () => {
    const component = render(
        <Blog blog={blog} updateLike={updateLike} removeBlog={removeBlog} />
    )

    expect(component.container).toHaveTextContent('test title');

    expect(component.container).toHaveTextContent('test author');
})

test('clicking the button view event', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const component = render(
        <Blog blog={blog} updateLike={updateLike} removeBlog={removeBlog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('https://test.com');
    expect(component.container).toHaveTextContent('likes: 3');
})

test('clicking the like button twice', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} updateLike={mockHandler} removeBlog={removeBlog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
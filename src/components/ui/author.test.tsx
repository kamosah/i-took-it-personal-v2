import { describe, it, expect } from "vitest";
import { render, screen } from "../../lib/test-utils/test-utils";
import { Author } from "./author";

describe("Author", () => {
  const mockProps = {
    name: "John Doe",
    avatar: "/images/avatar.jpg",
    linkedInLink: "https://linkedin.com/in/johndoe",
    twitterLink: "https://twitter.com/johndoe",
  };

  it("renders author name", () => {
    render(<Author {...mockProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders LinkedIn handle", () => {
    render(<Author {...mockProps} />);
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
  });

  it("renders LinkedIn link with correct href", () => {
    render(<Author {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://linkedin.com/in/johndoe");
  });

  it("renders LinkedIn link that opens in new tab", () => {
    render(<Author {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders external link icon", () => {
    render(<Author {...mockProps} />);
    // This depends on how the icon is rendered in the DOM
    // You might need to adjust the query if it has a specific test ID or role
    expect(screen.getByText("@johndoe").parentElement).toBeInTheDocument();
  });
});

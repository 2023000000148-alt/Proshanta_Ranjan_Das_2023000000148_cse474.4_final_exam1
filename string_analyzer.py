def count_and_sum_vowels(user_input):
    """
    Count vowels in a string and return their combined ASCII sum.

    Steps:
        1. Strip leading/trailing whitespace.
        2. Convert the string to lowercase.
        3. Count vowels (a, e, i, o, u).
        4. Sum the ASCII values of those vowels.

    Args:
        user_input (str): The string to analyze.

    Returns:
        tuple: (vowel_count, ascii_sum)
               Returns (0, 0) if the string is empty or has no vowels.
    """
    # Handle non-string or None input gracefully
    if not isinstance(user_input, str):
        return (0, 0)

    # Step 1 & 2: strip whitespace and lowercase
    cleaned = user_input.strip().lower()

    # Step 3 & 4: count vowels and sum their ASCII values
    vowels = "aeiou"
    vowel_count = 0
    ascii_sum = 0

    for char in cleaned:
        if char in vowels:
            vowel_count += 1
            ascii_sum += ord(char)

    # Returns (0, 0) automatically if no vowels found
    return (vowel_count, ascii_sum)


# ---------------------------------------------------------
# Quick manual test (only runs when file is executed directly)
# ---------------------------------------------------------
if __name__ == "__main__":
    print(count_and_sum_vowels("Hello"))     # (2, 212)
    print(count_and_sum_vowels(""))          # (0, 0)
    print(count_and_sum_vowels("fly"))       # (0, 0)
    print(count_and_sum_vowels("A1! e"))     # (2, 198)
    print(count_and_sum_vowels("  EducAtion  "))  # e,u,a,i,o -> (5, 537)